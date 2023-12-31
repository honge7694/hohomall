from rest_framework import permissions

class IsAuthorOrReadonly(permissions.BasePermission):
    # 인증된 유저에 대해 목록 조회/포스팅 등록 허용
    def has_permission(self, request, view):
        return request.user.is_authenticated

    # 작성자에 한해 Record에 대한 수정/삭제 허용
    def has_object_permission(self, request, views, obj):
        # 조회 요청은 항상 True
        if request.method in permissions.SAFE_METHODS:
            return True
        # PUT, DELETE 요청에 대해 작성자에게만 허용
        return obj.user_id == request.user