from django.urls import path
from .views import JobView, JobApplicationView

urlpatterns = [
    path('jobs/', JobView.as_view()),  # for creating and fetching jobs
    path('employers/<int:employer_id>/jobs/', JobView.as_view()),  # for fetching jobs by employer
    path('jobs/<int:job_id>/', JobView.as_view()),  # for updating and deleting specific jobs
    path('jobs/<int:job_id>/apply/', JobApplicationView.as_view(), name='job-apply'),  # Submit job application
    path('job-seekers/<int:seeker_id>/applications/', JobApplicationView.as_view(), name='job-seeker-applications'),  # Track applications
    path('applications/<int:application_id>/', JobApplicationView.as_view()),  # Update and withdraw applications
]