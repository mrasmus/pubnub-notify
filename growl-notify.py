import threading
from Pubnub import Pubnub
from gntp import notifier
from datetime import datetime
from pnsettings import publish_key as p, subscribe_key as s

channel = 'notify'

pubnub = Pubnub(publish_key=p, subscribe_key=s)

def receive_message(data, channel):
  ts = datetime.fromtimestamp(float(data['timestamp']))
  notifier.mini(ts.strftime('%H:%M:%S: ' + data['message']))


pubnub.subscribe(channel, callback=receive_message)

import signal, sys

def kill_all_threads():
    for thread in threading.enumerate():
        if thread.isAlive():
            thread._Thread__stop()

def cleanup(signal=None, frame=None):
    print "\nCleaning up."
    kill_all_threads()
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)

def main():
    while True:
        try:
            input = raw_input('EOF to exit')
        except:
            cleanup()

if __name__ == "__main__":
    main()
