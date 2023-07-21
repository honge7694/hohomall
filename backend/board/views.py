from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer


class QuestionListCreateAPIView(ListCreateAPIView):
    """
    Question 생성 및 리스트
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_id=user)
        return super().perform_create(serializer)
    

class QuestionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    Question 수정 및 삭제
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    

class AnswerListCreateAPIView(ListCreateAPIView):
    """
    Answer 생성 및 리스트
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(admin=user)
        return super().perform_create(serializer)
    

class AnswerRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    Answer 수정 및 삭제
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer