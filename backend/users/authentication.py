from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            header = self.get_header(request)

            if header is None:
                raw_token = request.COOKIES.get(settings.AUTH_COOKIE)
            else:
                raw_token = self.get_raw_token(header)

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)
            # Cache the user on the request object to prevent redundant queries
            if not hasattr(request, '_cached_user'):
                user = self.get_user(validated_token)
                request._cached_user = user
            else:
                user = request._cached_user


            return user, validated_token
        except:
            return None
