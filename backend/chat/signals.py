from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import ChatMessage

@receiver(post_save, sender=ChatMessage)
def message_created(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            instance.receiver_id.account_id,
            {
            'type': 'send_message',
            'message': instance,
            }
        )
        async_to_sync(channel_layer.group_send)(
            instance.sender_id.account_id,
            {
            'type': 'send_message',
            'message': instance,
            }
        )
