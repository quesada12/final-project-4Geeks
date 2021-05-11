"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cancha, Reserva
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

#---------------------------  USER ENDPOINTS ---------------------------------------------

@api.route('/user', methods=['GET'])
@jwt_required()
def get_all_users():
    result= User.query.all()
    all_users = list(map(lambda x: x.serialize(), result))
    return jsonify(all_users), 200

@api.route('/user/<int:id>',methods=['GET'])
@jwt_required()
def get_user(id):
    user= User.query.get(id)

    if user is None:
        raise APIException('User not found', status_code=404)

    return jsonify(user.serialize()), 200

@api.route('/user/<string:email>', methods=['GET'])
def get_code(email):
    usuario = User.query.filter_by(email=email).first()
    if usuario is None:
        raise APIException('Usuario not found', status_code=404)
    return jsonify(usuario.serializeCode()),200

@api.route('/user', methods=['POST'])
def create_user():
    email= request.json.get("email",None)
    password= request.json.get("password",None)
    codigoVerificacion= request.json.get("codigoVerificacion",None)
    nombre= request.json.get("nombre",None)
    apellidos= request.json.get("apellidos",None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        new_user = User()
        new_user.email=email
        new_user.password=password
        new_user.codigoVerificacion=codigoVerificacion
        new_user.nombre=nombre
        new_user.apellidos=apellidos
        new_user.is_active=True
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msj":"Usuario creado"}),200
    else:
        return jsonify({"msj":"Usuario ya existe"}),401

@api.route('/login' , methods=['POST'])
def login():
    email= request.json.get("email",None)
    password= request.json.get("password",None)
    user = User.query.filter_by(email=email,password=password).first()
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({"token":access_token,"user":user.id}),200
    else:
        return jsonify({"msj":"todo mal"}),401

@api.route('/update', methods=['PUT'])
def update_password():
    user_id = request.json.get("user_id",None)
    codigoVerificacion = request.json.get("codigoVerificacion",None)
    password = request.json.get("password",None)
    user = User.query.filter_by(id=user_id,codigoVerificacion=codigoVerificacion).first()
    if user is None:
        raise APIException('User not found', status_code=404)
    else:
        user.password = password
        db.session.commit()
        return jsonify({"user":"ok"}),200

#---------------------------  CANCHA ENDPOINTS ---------------------------------------------

@api.route('/cancha', methods=['GET'])
def get_all_canchas():
    result= Cancha.query.all()
    all_canchas = list(map(lambda x: x.serializeRes(), result))
    return jsonify(all_canchas), 200

@api.route('/cancha/<int:id>',methods=['GET'])
@jwt_required()
def get_cancha(id):
    cancha= Cancha.query.get(id)

    if cancha is None:
        raise APIException('Cancha not found', status_code=404)

    return jsonify(cancha.serialize()), 200


#---------------------------  RESERVA ENDPOINTS ---------------------------------------------

@api.route('/user/<int:id>/reservas', methods=['GET'])
@jwt_required()
def get_user_reservas(id):
    user = User.query.get(id)

    if user is None:
        raise APIException('User not found', status_code=404)

    return jsonify(user.serializeReservas()),200

@api.route('/user/<int:id>/reservas', methods=['POST'])
@jwt_required()
def create_reserva(id):
    user_id = id
    cancha_id= request.json.get("cancha_id",None)
    fecha= request.json.get("fecha",None)
    hora= request.json.get("hora",None)
    cancha_nombre = request.json.get("cancha_nombre",None)
    new_reserva = Reserva()
    new_reserva.user_id= user_id
    new_reserva.cancha_id=cancha_id,
    new_reserva.fecha=fecha,
    new_reserva.hora=hora
    new_reserva.cancha_nombre=cancha_nombre
    db.session.add(new_reserva)
    db.session.commit()
    return jsonify({"msj":"Reserva creada exitosamente"}),200


@api.route('/reserva', methods=['POST'])
@jwt_required()
def look_reserva():
    cancha_id= request.json.get("cancha_id",None)
    fecha= request.json.get("fecha",None)
    hora= request.json.get("hora",None)
    reserva = Reserva.query.filter_by(cancha_id=cancha_id, fecha=fecha, hora=hora).first()
    if reserva is None:
        return jsonify({"msj":"Reserva Disponible"}),200
    else:
        return jsonify({"msj":"Reserva ya creada"}),401
    

@api.route('/reserva', methods=['GET'])
@jwt_required()
def get_all_reservas():
    result= Reserva.query.all()
    all_reservas = list(map(lambda x: x.serialize(), result))
    return jsonify(all_reservas), 200