from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    gender = Column(Boolean)

    username = Column(String)
    e_mail = Column(String)
    password = Column(String)

    date_of_birth = Column(Date)
    place_of_birth_id = Column(Integer, ForeignKey("cities.id"))
    place_of_residence_id = Column(Integer, ForeignKey("cities.id"))

    institution_id = Column(Integer, ForeignKey("institutions.id"))
    role_id = Column(Integer, ForeignKey("roles.id")) #uloge na sistemu

    institution = relationship("Institution", back_populates="users")
    place_of_birth = relationship("City", foreign_keys=[place_of_birth_id], back_populates="birth_users")
    place_of_residence = relationship("City", foreign_keys=[place_of_residence_id], back_populates="residence_users")
    role = relationship("Role", back_populates="users")
    recordings = relationship("Recording", back_populates="user")


class Institution(Base):
    __tablename__ = "institutions"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String)
    city_id = Column(Integer, ForeignKey("cities.id"))

    users = relationship("User", back_populates="institution")
    city = relationship("City", back_populates="institutions")


class City(Base):
    __tablename__ = "cities"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)

    birth_users = relationship("User", foreign_keys='User.place_of_birth_id', back_populates="place_of_birth")
    residence_users = relationship("User", foreign_keys='User.place_of_residence_id', back_populates="place_of_residence")
    institutions = relationship("Institution", back_populates="city")

class Experiment(Base):
    __tablename__ = "experiments"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String)
    contents = Column(String)
    tag_id = Column(Integer, ForeignKey("tags.id"))
    is_recommended = Column(Boolean, default=False)

    recordings = relationship("Recording", back_populates="experiment")

    tags = relationship("Tag", back_populates='experiments')


class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, nullable=False)
    experiments = relationship("Experiment", back_populates='tags')


class Recording(Base):
    
    __tablename__ = "recordings"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    experiment_id = Column(Integer, ForeignKey("experiments.id"), primary_key=True)
    date = Column(DateTime(timezone=True), server_default=func.now())

    strike = Column(Boolean, default=False)
    is_reported = Column(Boolean, default=False)


    path = Column(String)

    user = relationship("User", back_populates="recordings")
    experiment = relationship("Experiment", back_populates="recordings")


class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String)

    users = relationship("User", back_populates="role")



