from pimote import PiMote
import cherrypy
import string  

#pip install cherrypy

class PiMoteServer(object):
    def __init__(self, pm):
        self.pm = pm

    @cherrypy.expose
    def index(self):
        return "Hello world!"

    @cherrypy.expose
    def power(self, socket=0, on="none"):
        #socket = all or 0 is for all 
	if isinstance(socket, basestring):
            if string.lower(socket) == "all":
                socket = 0
            else:
                socket = int(socket, 10)

        #just going to /power wont make anything happen
        if on == "none":
            if socket == 0:   
                return "No Change"
            
            on = True
        
        # true, TRUE, on turns the socket(s) on
        if isinstance(on, basestring):
            if on.isdigit():
                on = int(on, 10)
            elif string.lower(on) == "off":    
                on = False
            elif string.lower(on) == "on":    
                on = True
            else:    
                on = (string.lower(on) == "true")
        
        # 0 is OFF all else is ON
        if isinstance(on, int):
            print "is int"
            on = (on <> 0)
            
        
	result = self.pm.power(socket, on)
        return 'OK'

if __name__ == '__main__':
    cherrypy.quickstart(PiMoteServer(PiMote()))
