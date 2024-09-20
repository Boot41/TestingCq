from django.urls import path
from .views import JobView

urlpatterns = [
    path('jobs/<int:job_id>/', JobView.as_view()),
]
