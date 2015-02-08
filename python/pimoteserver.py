from pimote import PiMote
import cherrypy

class PiMoteServer(object):
    @cherrypy.expose
    def index(self):
        return "Hello world!"

    @cherrypy.expose
    def power(socket="all", on=True):
        pm = PiMote()
        pm.power(socket, on)
        return 'OK'

if __name__ == '__main__':
    cherrypy.quickstart(PiMoteServer())
