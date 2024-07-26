from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class ChatMessageManager(models.Manager):
    def create(self, sender, receiver, data):
        if (sender.role == "USER"):
            sender_name = sender.user_data.display_name
            sender_img = sender.user_data.profile_pic
        elif (sender.role == "SHELTER"):
            sender_name = sender.shelter_data.name
            sender_img = sender.shelter_data.profile_pic
        else:
            sender_name = "unknown"
            sender_img = None
        if (receiver.role == "USER"):
            receiver_name = receiver.user_data.display_name
            receiver_img = receiver.user_data.profile_pic
        elif (receiver.role == "SHELTER"):
            receiver_name = receiver.shelter_data.name
            receiver_img = receiver.shelter_data.profile_pic
        else:
            receiver_name = "unknown"
            receiver_img = None
        message = ChatMessage(
            sender_id = sender,
            sender_name = sender_name,
            sender_img = sender_img,
            receiver_id = receiver,
            receiver_name = receiver_name,
            receiver_img = receiver_img,
            data = data
        )
        message.save()
        return message

class ChatMessage(models.Model):
    sender_id = models.ForeignKey(UserModel, related_name="sent_messages", on_delete=models.CASCADE)
    sender_name = models.CharField(max_length=255)
    sender_img = models.ImageField()
    receiver_id = models.ForeignKey(UserModel, related_name="received_messages", on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=255)
    receiver_img = models.ImageField()
    # type = models.CharField(max_length=15) # text | pet
    data = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    objects = ChatMessageManager()

    class Meta:
        ordering = ['-created',]

    def __str__(self):
        return f"{self.sender.identifier} => {self.receiver.identifier} : {self.content}"
