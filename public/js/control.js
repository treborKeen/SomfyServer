            /*global io */
            var socket = io();
            

            
            
            // Send data through socket
           
            function update(zone, value) {
                //console.log('emitting' + tuner + value)

                socket.emit('update', zone, value);
            }

            
            function updateAll(data) {
                //console.log('all down pressed')
                socket.emit('updateAll',data);

            }