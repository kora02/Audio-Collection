from fastapi import FastAPI, Depends, HTTPException, UploadFile, APIRouter, File
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from typing import List
import schemas
from pydantic import BaseModel
from database.database import get_db, engine
from database import models
from authorize import get_current_user
import shutil
import os

router = APIRouter()



@router.post("/experiments", response_model= schemas.Experiment)
def create_experiment(experiment: schemas.ExperimentCreate, db: Session = Depends(get_db)):
    db_experiment = models.Experiment(title=experiment.title, contents=experiment.contents)
    db.add(db_experiment)
    db.commit()
    db.refresh(db_experiment)
    return db_experiment

@router.put("/experiments", response_model=schemas.ExperimentPut)
def update_experiment(experiment_data: schemas.ExperimentPut, db: Session = Depends(get_db)):

    db_exp = db.query(models.Experiment).filter(models.Experiment.id == experiment_data.id).first()
    if db_exp:
        if experiment_data.title:
            db_exp.title = experiment_data.title
        if experiment_data.contents:
            db_exp.contents = experiment_data.contents
        db.commit()
        db.refresh(db_exp)
    return db_exp

@router.get("/experiments", response_model=List[schemas.Experiment])
def read_experiments(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    experiments = db.query(models.Experiment).offset(skip).limit(limit).all()
    return experiments


@router.get("/experiments/recommended", response_model=List[schemas.Experiment])
def read_experiments(db: Session = Depends(get_db)):
    experiments = db.query(models.Experiment).filter(models.Experiment.is_recommended == True).all()
    return experiments


@router.get("/experiments/{experiment_id}", response_model= schemas.Experiment)
def read_experiment(experiment_id: int, db: Session = Depends(get_db)):
    experiment = db.query(models.Experiment).filter(models.Experiment.id == experiment_id).first()
    if experiment is None:
        raise HTTPException(status_code=404, detail="Experiment not found!")
    return experiment


@router.delete("/experiments/{experiment_id}", response_model= schemas.Experiment)
def delete_experiment(experiment_id: int, db: Session = Depends(get_db)):
    experiment = db.query(models.Experiment).filter(models.Experiment.id == experiment_id).first()
    if experiment is None:
        raise HTTPException(status_code=404, detail="Experiment not found, so it can't be deleted!")
    db.delete(experiment)
    db.commit()
    return experiment




@router.post("/upload-audio/{experiment_id}")
async def upload_audio(experiment_id: int, file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    audio_dir = "audio_files"
    os.makedirs(audio_dir, exist_ok=True)

    file_location = os.path.join(audio_dir, f"{current_user.username}_{experiment_id}_{file.filename}")
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)


    db_recording = models.Recording(user_id=current_user.id, experiment_id=experiment_id, path=file_location)

    return {"data": db_recording}


@router.post("/recordings")
def create_recording(recording: schemas.RecordingCreate, db: Session = Depends(get_db)):
    path = recording.path.split('/')
    new_path = path[1]
    db_recording = models.Recording(user_id=recording.user_id, experiment_id=recording.experiment_id, path=new_path)
    db.add(db_recording)
    db.commit()
    db.refresh(db_recording)
    return db_recording


class RecordingPut(BaseModel):
    user_id: int
    is_reported: bool


@router.put('/record/{id}')
def update_recording(id: int, snimak: RecordingPut, db: Session = Depends(get_db)):
    recording = db.query(models.Recording).filter(models.Recording.experiment_id == id and models.Recording.user_id == snimak.user_id).first()
    recording.is_reported = snimak.is_reported
    recording.strike = True

    db.commit()
    db.refresh(recording)

    return recording


@router.get("/recordings_display", response_model= List[schemas.RecordingDisplay])
def read_recordings(db: Session = Depends(get_db)):
    query = "SELECT users.username, experiments.title, recordings.path, experiments.id, users.id as user_id FROM recordings JOIN users ON recordings.user_id = users.id JOIN experiments ON recordings.experiment_id = experiments.id  WHERE recordings.is_reported = false;"
    with engine.connect() as conn:
        result = conn.execute(text(query))
        recordings = result.fetchall()
        dict_recordings = [{'username' : pair[0], 'title': pair[1], 'path': pair[2], 'id' : pair[3], "user_id" : pair[4]} for pair in recordings]
        print(recordings)
        return dict_recordings



@router.get("/recordings/{user_id}", response_model= List[schemas.Recording])
def read_user_recordings(user_id: int, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    recordings = db.query(models.Recording).filter(models.Recording.user_id == user_id).offset(skip).limit(limit).all()
    if recordings is None:
        raise HTTPException(status_code=404, detail="No recordings found for requested user!")
    return recordings

@router.get("/recordings/{experiment_id}", response_model= List[schemas.Recording])
def read_experiment_recordings(experiment_id: int, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    experiments = db.query(models.Recording).filter(models.Recording.experiment_id == experiment_id).offset(skip).limit(limit).all()
    if experiments is None:
        raise HTTPException(status_code=404, detail="No recordings found for requested experiment!")
    db.delete(experiments)
    db.commit()
    return experiments