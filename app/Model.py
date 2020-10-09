from collections import namedtuple

class User:


    def __init__(self, args):
        self.name   = args['name']
        self.id     = args['id']
        self.access = args['lvl']
        self.email  = args['email']

    def email_subject(self, name):
        string = "Отчет {}".format( name, self.id )
        return string

    def email_body(self):
        string = "от: {}\nинн: {}\nпочта: {}".format(self.name, self.id, self.email )
        return string