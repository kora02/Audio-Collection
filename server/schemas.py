from pydantic import BaseModel
from typing import Union
from datetime import datetime


# Pydantic models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class UserBase(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None

class UserSimple(BaseModel):
    username: str
    password: str

class UserFirstRegister(BaseModel):
    e_mail: str
    username: str
    password: str

class UserInDB(UserBase):
    hashed_password: str


class UserList(BaseModel):
    id: int
    username: str
    role_id: Union[int, None]

class UserDeleteResponse(BaseModel):
    message: str
    user_id: int


class UsersScore(BaseModel):
    username: str
    score: int

# Pydantic models for experiments

class ExperimentBase(BaseModel):
    title: str
    contents: str

class ExperimentPut(BaseModel):
    id: int
    title: str
    contents: str

class ExperimentCreate(ExperimentBase):
    pass


class Experiment(ExperimentBase):
    id: int
    
    class Config:
        orm_mode = True



# Pydantic models for recordings
class RecordingBase(BaseModel):
    user_id: int
    experiment_id: int 
    path: str

class RecordingCreate(RecordingBase):
    pass


class Recording(RecordingBase):
    date: datetime
    
    class Config:
        orm_mode = True


class RecordingDisplay(BaseModel):
    username: str
    title: str
    path: str
    id: int
    user_id: int


# Pydantic models for adding and returning information
class PersonalInfo(BaseModel):
    first_name: str
    last_name: str
    gender: str

    username: str
    e_mail: str
    password: str

    date_of_birth: datetime
    place_of_birth: str
    place_of_residence: str

    institution_name: str
    role_name: str


class RoleCreate(BaseModel):
    id: int
    name: str

class UpdateUser(BaseModel):
    place_of_birth: str
    place_of_residence: str
    institution_city: str
    institution_name: str
    first_name: str
    last_name: str

class UserRole(BaseModel):
    username: str
    role: str
      
      
class Data(BaseModel):
    useri: int
    testeri: int
    admini: int
    eksperimenti: int

class MFData(BaseModel):
    name: str
    value: int
