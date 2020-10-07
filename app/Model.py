from collections import namedtuple

class User:


    def __init__(self, args):
        self.name   = args['name']
        self.id     = args['id']
        self.access = args['lvl']
        self.email  = args['email']

    def email_subject(self, name):
        string = "{} {}".format( name, self.id )
        return string

    def email_body(self):
        string = "From {}\nid {}".format(self.name, self.id)
        return string