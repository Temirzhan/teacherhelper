# doc https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html#-Request-Body-Parameters
import requests, json

def send_email():

    url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send"

    html = '''
    <h3>Hello Test</h3>
    <p>Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Expedita dicta nisi nobis quos eum officiis adipisci natus est doloribus quisquam voluptates suscipit culpa beatae ex, labore iusto voluptatum totam numquam.</p>
    '''.strip()

    payload = {  
            "personalizations": [ { "to": [ {"email": "9keepa@gmail.com"} ], "subject": "Hello, World!"    }  ],  
            "from": {"email": "site@test.com"}, 
            "content": [{"type": "text/html","value": html},   ]
        }
    headers = {
        'x-rapidapi-host': "rapidprod-sendgrid-v1.p.rapidapi.com",
        'x-rapidapi-key': "",
        'content-type': "application/json",
        'accept': "application/json"
        }

    response = requests.request("POST", url, data=json.dumps(payload), headers=headers)
    print(response)
