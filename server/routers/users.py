from fastapi import FastAPI, Depends, HTTPException, APIRouter, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import schemas
from database.database import get_db, engine
from database import models

router = APIRouter()

@router.get('/user_ranking', response_model=List[schemas.UsersScore])
def read_users_score(db: Session = Depends(get_db)):

    query = "SELECT u.username AS user_name,COALESCE(SUM(CASE WHEN r.strike = FALSE THEN 10 WHEN r.strike = TRUE THEN -5000 ELSE 0 END), 0) AS score FROM users u LEFT JOIN recordings r ON u.id = r.user_id GROUP BY u.username ORDER BY score DESC;"
    
    with engine.connect() as conn:
        result = conn.execute(text(query))
        users = result.fetchall()
        dict_users = [{'username' : pair[0], 'score' : pair[1]} for pair in users]
        print(users[0])
        return dict_users
    


@router.get('/users/{username}', response_model=schemas.UserRole) 
def get_user(username: str, db: Session = Depends(get_db)):
    user =  db.query(models.User).filter(models.User.username == username).first()
    
    result = db.query(models.Role).filter(models.Role.id == user.role_id).first()

    
    if not result :
        raise HTTPException(status_code=404, detail='Not found')


    return {
        'username' : user.username,
        'role' : result.name
    }



    