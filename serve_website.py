
# -*- coding: utf-8 -*-

import smtplib
import logging

from datetime import datetime
from email.mime.text import MIMEText

from flask import Flask, jsonify, render_template, request

app = Flask(__name__,
            template_folder='website/templates',
            static_folder='website/static',
            static_url_path='/static')

logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())
logger.addHandler(logging.FileHandler('lensa.log'))
logger.setLevel(logging.DEBUG)

recipients = ["info@lensa.com", "zsolt.varga@lensa.com", ]


@app.route("/")
def features():
    return render_template("features.html")


@app.route("/whitelabel/")
def whitelabel():
    return render_template("whitelabel.html")


@app.route("/contact/", methods=['POST'])
def contact():
    logger.info(datetime.now())
    logger.info(request.form)
    contact_message = request.form['contact-message']
    contact_name = request.form['contact-name']
    contact_email = request.form['contact-email']
    # contact_secret = request.form['contact-secret']

    msg = MIMEText(contact_message)
    msg['Subject'] = "lensa.com contact message from %s" % contact_name
    msg['From'] = "%s <%s>" % (contact_email, contact_name)
    msg['To'] = ", ".join(recipients)

    s = smtplib.SMTP('localhost')
    s.sendmail(contact_email, recipients, msg.as_string())
    s.quit()
    return jsonify({'success': True})


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
