"""empty message

Revision ID: ee7863d132ba
Revises: 8e6edb663b60
Create Date: 2021-05-03 18:39:03.153668

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee7863d132ba'
down_revision = '8e6edb663b60'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cancha',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=200), nullable=False),
    sa.Column('img', sa.String(length=200), nullable=False),
    sa.Column('costo', sa.String(length=10), nullable=False),
    sa.Column('ubicacion', sa.String(length=250), nullable=False),
    sa.Column('provincia', sa.Integer(), nullable=False),
    sa.Column('canton', sa.Integer(), nullable=False),
    sa.Column('distrito', sa.Integer(), nullable=False),
    sa.Column('capacidad', sa.String(length=150), nullable=False),
    sa.Column('descripcion', sa.String(length=250), nullable=False),
    sa.Column('lat', sa.String(length=10), nullable=False),
    sa.Column('lng', sa.String(length=10), nullable=False),
    sa.Column('horaInicio', sa.Integer(), nullable=False),
    sa.Column('horaFin', sa.Integer(), nullable=False),
    sa.Column('duracion', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reserva',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('cancha_id', sa.Integer(), nullable=False),
    sa.Column('fecha', sa.Date(), nullable=False),
    sa.Column('hora', sa.String(length=5), nullable=False),
    sa.ForeignKeyConstraint(['cancha_id'], ['cancha.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('user', sa.Column('apellidos', sa.String(length=250), nullable=True))
    op.add_column('user', sa.Column('codigoVerificacion', sa.String(length=7), nullable=False))
    op.add_column('user', sa.Column('nombre', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'nombre')
    op.drop_column('user', 'codigoVerificacion')
    op.drop_column('user', 'apellidos')
    op.drop_table('reserva')
    op.drop_table('cancha')
    # ### end Alembic commands ###
