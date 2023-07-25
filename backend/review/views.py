from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.response import Response
from .models import Review, ReviewLike
from .serializers import ReviewSerializer, ReviewLikeSerializer
from .permissions import IsAuthorOrReadonly
from product.models import Product


class ReviewListCreateAPIView(ListCreateAPIView):
    """
    Product Review 생성 및 리스트
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(product_id=self.request.query_params.get('product_id'))
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.query_params.get('product_id')
        product = Product.objects.filter(id=product_id).first()
        serializer.save(user_id=user, product_id=product)
        return super().perform_create(serializer)


class ReviewRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    Review 수정 및 삭제
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthorOrReadonly, ]


class ReviewLikeListCreateAPIView(ListCreateAPIView):
    """
    Review 좋아요
    """
    queryset = ReviewLike.objects.all()
    serializer_class = ReviewLikeSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        qs = qs.filter(review_id=self.kwargs['pk'], user_id=user)
        return qs

    def perform_create(self, serializer):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        user = self.request.user
        review_id = self.kwargs['pk']
        review = Review.objects.get(pk=review_id)
        serializer.save(review_id=review, user_id=user)
        return super().perform_create(serializer)
    

class ReviewListAPIView(ListAPIView):
    """
    Review 작성 리뷰 리스트
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user_id=self.request.user)
        return qs
    