from api import db, ma


class Translate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_text = db.Column(db.String(5000), unique=True)
    translate_text = db.Column(db.String(5000), unique=True)

    def __init__(self, source_text, translate_text):
        self.source_text = source_text
        self.translate_text = translate_text


class TranslateSchema(ma.Schema):
    class Meta:
        model = Translate

translate_schema = TranslateSchema()
translates_schema = TranslateSchema(many=True)


