import logging, os, hashlib
from Globals import PATH

def hash_(string):
    return hashlib.sha1(string.encode()).hexdigest()

def load_users():
    absolute = os.path.join( PATH, "data", "users.txt" )
    with open(absolute) as f:
        data = f.read()

    users = data.split("\n")
    usersD = {}
    for user in users:
        temp = {}
        spl = user.split(":")
        temp['id']   = spl[0]
        temp['name'] = spl[1]
        temp['lvl']  = spl[2]
        usersD[spl[0]] = temp
    return usersD



def log(*args, **kwargs):
    name_logger = args[0]
    path_file   = args[1]
    write = kwargs.setdefault("write", False)
    # создаём logger
    logger = logging.getLogger(name_logger)
    logger.setLevel( logging.DEBUG )

    # создаём консольный handler и задаём уровень
    if not write:
        ch = logging.StreamHandler()
    else:
        # log write in disk
        ch = logging.FileHandler(os.path.join(PATH, "logs" ,path_file))

    ch.setLevel(logging.DEBUG)

    # создаём formatter
    formatter = logging.Formatter('%(asctime)s : line %(lineno)-3s : %(name)s : %(levelname)s : %(message)s')
    # %(lineno)d :
    # добавляем formatter в ch
    ch.setFormatter(formatter)

    # добавляем ch к logger
    logger.addHandler(ch)
    # Api
    # logger.debug('debug message')
    # logger.info('info message')
    # logger.warn('warn message')
    # logger.error('error message')
    # logger.critical('critical message')
    return logger
