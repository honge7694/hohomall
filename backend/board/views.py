from rest_framework.generics import ListCreateAPIView
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer


class QuestionListCreateAPIView(ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_id=user)
        return super().perform_create(serializer)
    

class AnswerListCreateAPIView(ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(admin=user)
        return super().perform_create(serializer)
    