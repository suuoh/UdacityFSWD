from twilio.rest import Client

# Your Account SID from twilio.com/console
account_sid = "AC95eeae50232364647f7732cbc3c865e3"
# Your Auth Token from twilio.com/console
auth_token  = "d90588ca936f3ffb9198eae76f1545c2"

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+14165208081", 
    from_="+16479521735",
    body="Hello from Python!")

print(message.sid)
