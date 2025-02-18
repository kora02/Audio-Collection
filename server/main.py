from typing import Union, List

from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
from sqlalchemy.orm import Session

import authorize
from schemas import UserList, UserDeleteResponse, UserFirstRegister, UpdateUser, RoleCreate, PersonalInfo, Data, MFData, Experiment
from database.database import engine, Base, get_db
from database.models import User, City, Institution, Role
from routers import experiments
from routers import users

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  # React development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/audio", StaticFiles(directory="audio_files"), name="audio")

@app.post("/token", response_model=authorize.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authorize.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Pogrešan username ili password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=authorize.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authorize.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

#Testne 2 rute za vraćanje usera
@app.get("/users/me", response_model=authorize.UserBase)
async def read_users_me(current_user: authorize.User = Depends(authorize.get_current_active_user)):
    return current_user

@app.get("/user/data")
async def read_own_items(response_model = PersonalInfo, current_user: authorize.User = Depends(authorize.get_current_active_user), db: Session = Depends(get_db)):
    g = 'M'
    if current_user.gender:
        g = 'M'
    else:
        g = 'F'
    
    place_of_birth = db.query(City).filter(City.id == current_user.place_of_birth_id).first()
    place_of_residence = db.query(City).filter(City.id == current_user.place_of_residence_id).first()
    institution = db.query(Institution).filter(Institution.id == current_user.institution_id).first()
    role = db.query(Role).filter(Role.id == current_user.role_id).first()

    personal_info = PersonalInfo(
    first_name = current_user.first_name,
    last_name= current_user.last_name,
    gender = g,

    username = current_user.username,
    e_mail = current_user.e_mail,
    password = current_user.password,

    date_of_birth = current_user.date_of_birth,
    place_of_birth = place_of_birth.name,
    place_of_residence = place_of_residence.name,

    institution_name = institution.name,
    role_name = role.name
    )
    return [{"data": personal_info}]

@app.get("/user/all-projects", response_model=List[Experiment])
def get_all_experiments(db: Session = Depends(get_db)):
    return db.query(Experiment).all()
    
# vraca random eksperimente (user/pages/List1)
@app.get("/user", response_model=List[Experiment])
def get_random_experiments(db: Session = Depends(get_db), limit: int = 6):
    experiments = db.query(Experiment).all()
    random_experiments = sample(experiments, min(len(experiments), limit))
    return random_experiments

@app.get("/")
def foo():
    return {"hello": "world"}


async def get_users_by_email(email: str, db: Session):
    return db.query(User).filter(User.e_mail == email).first()

async def get_users_by_username(username: str, db: Session):
    return db.query(User).filter(User.username == username).first()

@app.post("/register2")
async def register(request: UserFirstRegister, db: Session = Depends(get_db)):
    hashed_password = authorize.get_password_hash(request.password)
    new_user = User(e_mail=request.e_mail, username=request.username, password=hashed_password)
    
    if await get_users_by_email(request.e_mail, db) or await get_users_by_username(request.username, db):
        print(await get_users_by_email(request.e_mail, db))
        print(await get_users_by_username(request.username, db))
        raise HTTPException(status_code=400, detail="Korisnik sa e-mail adresom ili username-om već postoji")
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token_expires = timedelta(minutes=authorize.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authorize.create_access_token(
        data={"sub": new_user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/getUsers", response_model=List[UserList])
def get_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 20):
    return db.query(User).filter(User.role_id == 0) .offset(skip).limit(limit).all()

@app.get("/getTesters", response_model=List[UserList])
def get_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 20):
    return db.query(User).filter(User.role_id == 1).offset(skip).limit(limit).all()

@app.delete("/deleteUser", response_model=UserDeleteResponse)
def delete_user(del_id: int, db: Session = Depends(get_db)):
    user_to_delete = db.query(User).filter_by(id=del_id).first()
    if user_to_delete:
        db.delete(user_to_delete)
        db.commit()
        return {"message": "User deleted successfully.", "user_id": del_id}
    else:
        raise HTTPException(status_code=404, detail="User not found.")
    

@app.put("/promoteUser")
def promote_user(prom_id: int, db: Session = Depends(get_db)):
    user_to_promote = db.query(User).filter_by(id=prom_id).first()
    if user_to_promote:
        user_to_promote.role_id = 1
        db.commit()
        return {"message": "User promoted successfully.", "prom_id": prom_id}
    else:
        raise HTTPException(status_code=404, detail="User not found.")

@app.put("/demoteUser")
def promote_user(dem_id: int, db: Session = Depends(get_db)):
    user_to_demote = db.query(User).filter_by(id=dem_id).first()
    if user_to_demote:
        user_to_demote.role_id = 0
        db.commit()
        return {"message": "User demoted successfully.", "dem_id": dem_id}
    else:
        raise HTTPException(status_code=404, detail="User not found.")

@app.post("/roles", response_model=RoleCreate)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    db_role = db.query(Role).filter(Role.id == role.id).first()
    if db_role:
        raise HTTPException(status_code=400, detail="Već postoji Role sa ovim ID-em")
    new_role = Role(id=role.id, name=role.name)
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role


@app.put("/user/new/data")
async def create_city(info: UpdateUser, db: Session = Depends(get_db), current_user: authorize.User = Depends(authorize.get_current_active_user)):
    if current_user:
        pob_id = 0
    else:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    pob_id = 0
    por_id = 0
    insc_id = 0
    ins_id = 0
    db_city = db.query(City).filter(City.name == info.place_of_birth).first()
    if db_city:
        pob_id = db_city.id
    else:
        new_city = City(name=info.place_of_birth)
        db.add(new_city)
        db.commit()
        db.refresh(new_city)
        pob_id = new_city.id
    

    db_city = db.query(City).filter(City.name == info.place_of_residence).first()
    if db_city:
        por_id = db_city.id
    else:
        new_city = City(name=info.place_of_residence)
        db.add(new_city)
        db.commit()
        db.refresh(new_city)
        por_id = new_city.id
   
    db_city = db.query(City).filter(City.name == info.institution_city).first()
    if db_city:
        insc_id = db_city.id
    else:
        new_city = City(name=info.institution_city)
        db.add(new_city)
        db.commit()
        db.refresh(new_city)
        insc_id = new_city.id

    db_institution = db.query(Institution).filter(Institution.name == info.institution_name).first()
    if db_institution:
        ins_id = db_institution.id
    else:
        new_institution = Institution(name=info.institution_name, city_id = insc_id)
        db.add(new_institution)
        db.commit()
        db.refresh(new_institution)
        ins_id = new_institution.id
    

    current_user.first_name = info.first_name
    current_user.last_name = info.last_name
    current_user.place_of_birth_id = pob_id
    current_user.place_of_residence_id = por_id
    current_user.institution_id = ins_id
    current_user.role_id = 0


    db.commit()
    db.refresh(current_user)

    return current_user



@app.get("/data", response_model=Data)
def create_role(db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.role_id == 0).count()
    db_tester = db.query(User).filter(User.role_id == 1).count()
    db_admin = db.query(User).filter(User.role_id == 2).count()
    db_eksperiment = db.query(Experiment).count()

    res = Data(useri=db_user, testeri=db_tester, admini=db_admin, eksperimenti=db_eksperiment)
    return res

@app.get("/data-m-f", response_model=List[MFData])
def male_female_num(db: Session = Depends(get_db)):
    M_users = db.query(User).filter(User.gender == True).count()
    F_users = db.query(User).filter(User.gender == False).count()
    
    res = [
        MFData(name='Broj Muških User-a', value=M_users),
        MFData(name='Broj Ženskih User-a', value=F_users)
    ]
    return res

@app.get("/data-uloge", response_model=List[MFData])
def male_female_num(db: Session = Depends(get_db)):
    M_users = db.query(User).filter(User.role_id == 0).count()
    F_users = db.query(User).filter(User.role_id == 1).count()
    
    res = [
        MFData(name='Broj User-a', value=M_users),
        MFData(name='Broj Tester-a', value=F_users)
    ]
    return res

app.include_router(experiments.router)
app.include_router(users.router)

