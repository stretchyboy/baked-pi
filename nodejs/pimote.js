//Pi-mote 
//Controls pi-mote by energenie4u.co.uk

//import the required modules
var GPIO = require('rpi-gpio');

// set the pins numbering mode
//GPIO.setmode(GPIO.BOARD)

// Select the GPIO pins used for the encoder K0-K3 data inputs
GPIO.setup(11, GPIO.DIR_OUT);
GPIO.setup(15, GPIO.DIR_OUT);
GPIO.setup(16, GPIO.DIR_OUT);
GPIO.setup(13, GPIO.DIR_OUT);

// Select the signal to select ASK/FSK
GPIO.setup(18, GPIO.DIR_OUT);

// Select the signal used to enable/disable the modulator
GPIO.setup(22, GPIO.DIR_OUT);

// Disable the modulator by setting CE pin lo
GPIO.write(22, false);

// Set the modulator to ASK for On Off Keying 
// by setting MODSEL pin lo
GPIO.write(18, false);

// Initialise K0-K3 inputs of the encoder to 0000
GPIO.write(11, false);
GPIO.write(15, false);
GPIO.write(16, false);
GPIO.write(13, false);

var PiMote = {
    
    power: function power(socket, on){
        if (typeof on === "undefined") {
            on = true;
        }
        
        if (typeof socket === "undefined") {
            GPIO.write(11, true);
            GPIO.write(15, true);
            GPIO.write(16, false);    
        } else { 
            GPIO.write(16, true);
            
            GPIO.output (11, socket >2);
            GPIO.output (15, (socket + q ));
        }            
        
        if (on) {    
            GPIO.write(13, true);
        } else {
            GPIO.write(13, false);
        }
        
        // let it settle, encoder requires this
        time.sleep(0.1);
        // Enable the modulator
        GPIO.write(22, true);
        // keep enabled for a period
        time.sleep(0.25);
        // Disable the modulator
        GPIO.write(22, false);
    }
};

var PiMoteExample = function() {
    // The On/Off code pairs correspond to the hand controller codes.
    // true = '1', false ='0'
    var pm = new PiMote();
    
    console.log("OUT OF THE BOX{ Plug the Pi Transmitter board into the Raspberry Pi");
    console.log("GPIO pin-header ensuring correct polarity and pin alignment.");
    console.log("");
    console.log("The sockets will need to be inserted into separate mains wall sockets.");
    console.log("with a physical separation of at least 2 metres to ensure they don't");
    console.log("interfere with each other. Do not put into a single extension lead.");
    console.log("");
    console.log("For proper set up the sockets should be in their factory state with");
    console.log("the red led flashing at 1 second intervals. If this is not the case for");
    console.log("either socket, press and hold the green button on the front of the unit");
    console.log("for 5 seconds or more until the red light flashes slowly.");
    console.log("");
    console.log("A socket in learning mode will be listening for a control code to be");
    console.log("sent from a transmitter. A socket can pair with up to 2 transmitters");
    console.log("and will accept the following code pairs");
    console.log("");
    console.log("0011 and 1011 all sockets ON and OFF");
    console.log("1111 and 0111 socket 1 ON and OFF");
    console.log("1110 and 0110 socket 2 ON and OFF");
    console.log("1101 and 0101 socket 3 ON and OFF");
    console.log("1100 and 0100 socket 4 ON and OFF");
    console.log("");
    console.log("A socket in learning mode should accept the first code it receives");
    console.log("If you wish the sockets to react to different codes, plug in and");
    console.log("program first one socket then the other using this program.");
    console.log("");
    console.log("When the code is accepted you will see the red lamp on the socket");
    console.log("flash quickly then extinguish");
    console.log("");
    console.log("The program will now loop around sending codes as follows when you");
    console.log("hit a key{");
    console.log("socket 1 on");
    console.log("socket 1 off");
    console.log("socket 2 on");
    console.log("socket 2 off");
    console.log("all sockets on");
    console.log("all sockets off");
    console.log("Hit CTL C for a clean exit");
    try{
        // We will just loop round switching the units on and off
        while (true) {
            var raw_input = null;
            raw_input('hit return key to send socket 1 ON code');
            // Set K0-K3
            console.log("sending code 1111 socket 1 on");
            pm.power(1, true);
            
            raw_input('hit return key to send socket 1 OFF code');
            // Set K0-K3
            console.log("sending code 0111 Socket 1 off");
            pm.power(1, false);
            
            raw_input('hit return key to send socket 2 ON code');
            // Set K0-K3
            console.log("sending code 1110 socket 2 on");
            pm.power(2, true);
            
            raw_input('hit return key to send socket 2 OFF code');
            // Set K0-K3
            console.log("sending code 0110 socket 2 off");
            pm.power(2, false);
            
            raw_input('hit return key to send ALL ON code');
            // Set K0-K3
            console.log("sending code 1011 ALL on");
            pm.power("all", true);
            
            raw_input('hit return key to send ALL OFF code');
            // Set K0-K3
            console.log("sending code 0011 All off");
            pm.power("all", false);
            
    // Clean up the GPIOs for next time
    //except KeyboardInterrupt{
    //    GPIO.cleanup()
        }
    } catch () {
    
    }
};
