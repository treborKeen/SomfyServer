            /*global io */
            var socket = io();
            

            
            
            // Send data through socket
           
            function page2(zone, value) {
                //console.log('emitting' + tuner + value)

                socket.emit('page2', zone, value);
            }

            function page(value) {

                socket.emit('page', value);

            }

            function allDown() {
                //console.log('all down pressed')
                socket.emit('allDown');

            }