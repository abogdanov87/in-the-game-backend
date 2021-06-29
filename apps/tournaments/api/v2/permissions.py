from rest_framework import permissions


class TournamentAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_authenticated and request.method in ['PATCH',]:
            try:
                return user.users_participant.filter(tournament=obj.id, active=True).first().admin
            except: 
                return False 
        return False


class ParticipantAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated and request.method in ['PATCH', 'POST']:
            try:
                for obj in request.data:
                    if not user.users_participant.filter(tournament=obj['tournament'], active=True).first().admin:
                        return False
                return True
            except: 
                return False 
        return False

    def has_object_permission(self, request, view, obj):
        return True
