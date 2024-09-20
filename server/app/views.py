from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Job, JobApplication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class JobView(View):
    # Existing job methods omitted for brevity

@method_decorator(csrf_exempt, name='dispatch')
class JobApplicationView(View):
    def post(self, request, job_id):
        try:
            seeker_data = json.loads(request.body)
            seeker_id = seeker_data['seeker_id']
            job = get_object_or_404(Job, id=job_id)
            application = JobApplication.objects.create(job=job, seeker_id=seeker_id)
            return JsonResponse({'message': 'Application submitted successfully', 'application_id': application.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def get(self, request, job_id):
        try:
            applications = JobApplication.objects.filter(job_id=job_id)
            applications_list = [{'seeker_id': app.seeker_id, 'status': app.status, 'applied_at': app.applied_at} for app in applications]
            return JsonResponse(applications_list, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def put(self, request, application_id):
        try:
            application = get_object_or_404(JobApplication, id=application_id)
            update_data = json.loads(request.body)
            application.status = update_data.get('status', application.status)
            application.save()
            return JsonResponse({'message': 'Application updated successfully', 'application_id': application.id}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def delete(self, request, application_id):
        try:
            application = get_object_or_404(JobApplication, id=application_id)
            application.delete()
            return JsonResponse({'message': 'Application withdrawn successfully'}, status=204)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def post_interview(self, request, application_id):
        try:
            interview_data = json.loads(request.body)
            interview_time = interview_data['time']
            application = get_object_or_404(JobApplication, id=application_id)
            # Assume there is a method to schedule an interview
            # schedule_interview(application, interview_time)
            return JsonResponse({'message': 'Interview scheduled successfully for application_id: {}'.format(application_id)}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
