from flask import render_template, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import get_translate_text

from api import app, db, ma
from api.models import *


@app.route("/translate", methods=['POST'])
def translate_text():
    try:
        text = request.json['text']
        print ("text", text)
        translated_text = get_translate_text(text)
        sample = Translate(text, translated_text)
        db.session.add(sample)
        db.session.commit()
        print ("Запись успешно добавлена")
    except:
        print("Ошибка при добавлении")
        db.session.rollback()
    return translate_schema.jsonify(sample)


@app.route("/savedb", methods=['POST'])
def save_to_db():
    text = request.json['text']
    print("text ", text)
    sourceLang = request.json['sourceLang']
    print("sourceLang ", sourceLang)
    translatedLang = request.json['translatedLang']
    print("translatedLang ", translatedLang)
    translated_text = get_translate_text(text, sourceLang, translatedLang)
    new_translate = Translate(text, translated_text)
    return jsonify(translated_text)

