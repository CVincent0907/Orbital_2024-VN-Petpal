from rest_framework import permissions

class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'SHELTER'

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'
