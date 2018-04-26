const socketio = require('./weapp.socket.io.js');

class Pusher {
  constructor(domId,pushUrl) {
    this.domId = domId
    this.pushUrl = pushUrl
    this.pusherContext = wx.createLivePusherContext(this.domId)
  }
}

class Player {
  constructor(domId,user,playUrl,page) {
    this.domId = domId
    this.user = user
    this.playUrl = playUrl
    this.playerContext = wx.createLivePlayerContext(this.domId, page)
  }
}


class Client {
  constructor(user,url,callback){
    this.pusher = null
    this.players = {}
    this.closed = false
    this.user = user
    this.url = url
    this.room = null
    this.callback = callback
  }
  joinRoom(room) {
    if(this.closed){
      return
    }
    this.room = room
    this.socket.emit('join', {
      user: this.user,
      room: this.room
    }, (data) => {
      this.callback.onJoined && this.callback.onJoined()
    })
  }
  leaveRoom(){
    if(this.closed){
      return
    }
    this.socket.emit('leave',{})
  }
  addPusher(pusher){
    if (this.closed) {
      return
    }
    this.pusher = pusher
    this.socket.emit('addPusher', {
      user: this.user,
      pushUrl: pusher.pushUrl
    })
  }
  removePusher(pusher) {
    if (this.closed) {
      return
    }
    this.pusher = null
    this.socket.emit('removePusher', {
      user: this.user,
      pushUrl: pusher.pushUrl
    })
  }
  close() {
    if(this.closed){
      return
    }
    this.closed = true
    this.socket && this.socket.disconnect(true)
    
    this.callback.onClose && this.callback.onClose() 
  }
  _setupSocket() {

    const socket = socketio(this.url, {
      reconnectionAttempts: 10
    })

    this.socket = socket

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', (reason) => {
      this.callback.onDisconnect && this.callback.onDisconnect(reason)
    })

    socket.on('reconnect', (attemptNumber) => {
      if (attemptNumber > 10) {
        this.close()
        return
      }

      this.callback.onReconnect && this.callback.onReconnect(attemptNumber)
    })

    socket.on('error', (err) => {
      this.callback.onError && this.callback.onError(err)
      this.close() //  do we need close here 
    })

    socket.on('pusher_added', (data) => {
      this._handlePusherAdded(data)
    })

    socket.on('pushers', (data) => {
      this._handlePushers(data)
    })

    socket.on('pusher_leaved', (data) => {
      this._handlePusherLeaved(data)
    })
  }

  _handlePusherAdded(data) {
    console.log('handlePusherAdded', data)
    this.players[data.user] = data.pushUrl

    this.callback.onPusherAdded && this.callback.onPusherAdded(data)
  }
  _handlePushers(data) {
    console.log('handlePushers', data)
    this.players = data

    this.callback.onPushers && this.callback.onPushers(data)
  }
  _handlePusherLeaved(data) {
    console.log('handlePusherLeaved', data)
    delete this.players[data.user]

    this.callback.onPusherLeaved && this.callback.onPusherLeaved(data)
  }
}


module.exports = {
  Pusher,
  Player,
  Client
}