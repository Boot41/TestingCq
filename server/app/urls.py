from django.urls import path
from .views import JobView

urlpatterns = [
    path('jobs/', JobView.as_view()),  # for creating jobs
    path('employers/<int:employer_id>/jobs/', JobView.as_view()),  # for fetching jobs by employer
    path('jobs/<int:job_id>/', JobView.as_view()),  # for updating and deleting specific jobs
]
