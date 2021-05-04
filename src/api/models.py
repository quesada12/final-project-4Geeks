from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#----------------------------------------------USER----------------------------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    codigoVerificacion = db.Column(db.String(7), unique=False, nullable=False)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    apellidos = db.Column(db.String(250), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    reservas = db.relationship('Reserva', backref='user',lazy=True)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "codigoVerificacion": self.codigoVerificacion,
            "nombre":self.nombre,
            "apellidos":self.apellidos,
            "reservas": list(map(lambda x: x.serialize(), self.reservas))
            # do not serialize the password, its a security breach
        }

    def serializeReservas(self):
        return{
            "reservas":list(map(lambda x: x.serialize(), self.reservas))
        }
    
    def serializeCode(self):
        return{
            "id":self.id,
            "codigoVerificacion":self.codigoVerificacion
        }

#----------------------------------------------CANCHA----------------------------------------

class Cancha(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), unique=False, nullable=False)
    img = db.Column(db.String(200), unique=False, nullable=False)
    costo = db.Column(db.String(10), unique=False, nullable=False)
    ubicacion = db.Column(db.String(250), unique=False, nullable=False)
    provincia = db.Column(db.Integer, unique=False, nullable=False)
    canton = db.Column(db.Integer, unique=False, nullable=False)
    distrito = db.Column(db.Integer, unique=False, nullable=False)
    capacidad = db.Column(db.String(150), unique=False, nullable=False)
    descripcion = db.Column(db.String(250), unique=False, nullable=False)
    lat = db.Column(db.String(10), unique=False, nullable=False)
    lng = db.Column(db.String(10), unique=False, nullable=False)
    horaInicio = db.Column(db.Integer, unique=False, nullable=False)
    horaFin = db.Column(db.Integer, unique=False, nullable=False)
    duracion = db.Column(db.Integer, unique=False, nullable=False)
    reservas = db.relationship('Reserva', backref='cancha',lazy=True)
    
    def __repr__(self):
        return '<Cancha %r>' % self.nombre

    def serialize(self):
        return{
            "id": self.id,
            "nombre": self.nombre,
            "img": self.img,
            "costo": self.costo,
            "ubicacion": self.ubicacion,
            "provincia": self.provincia,
            "canton":self.canton,
            "distrito":self.distrito,
            "capacidad": self.capacidad,
            "descripcion": self.descripcion,
            "lat":self.lat,
            "lng":self.lng,
            "horaInicio": self.horaInicio,
            "horaFin":self.horaFin,
            "duracion":self.duracion,
            "reservas": list(map(lambda x: x.serialize(), self.reservas))
        }
    
    def serializeRes(self):
        return{
            "id":self.id,
            "nombre":self.nombre,
            "img":self.img,
            "costo":self.costo,
            "ubicacion":self.ubicacion,
            "provincia":self.provincia,
            "canton": self.canton,
            "distrito":self.distrito
        }

#----------------------------------------------RESERVA----------------------------------------

class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    cancha_id = db.Column(db.Integer,db.ForeignKey('cancha.id'),nullable=False)
    cancha_nombre= db.Column(db.String(200),unique=False, nullable=True )
    fecha= db.Column(db.Date,unique=False, nullable=False )
    hora= db.Column(db.String(5),unique=False, nullable=False )

    def __repr__(self):
        return '<Reserva %r>' % self.id

    def serialize(self):
        return {
            "id":self.id,
            "user_id": self.user_id,
            "cancha_id": self.cancha_id,
            "cancha_nombre": self.cancha_nombre,
            "fecha":self.fecha,
            "hora":self.hora
        }
