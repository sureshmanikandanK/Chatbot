"""Add responses column to AI_info

Revision ID: ab09b1b27311
Revises: 
Create Date: 2024-12-04 12:23:14.054743

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab09b1b27311'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('AI_info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('responses', sa.Text(), nullable=False, server_default=''))

def downgrade():
    with op.batch_alter_table('AI_info', schema=None) as batch_op:
        batch_op.drop_column('responses')
