from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Job
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class JobView(View):
    def post(self, request):
        try:
            job_data = json.loads(request.body)
            job = Job.objects.create(
                title=job_data['title'],
                description=job_data['description'],
                employer_id=job_data['employer_id']
            )
            return JsonResponse({'message': 'Job created successfully', 'job_id': job.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def get(self, request, employer_id):
        jobs = Job.objects.filter(employer_id=employer_id)
        jobs_list = [{'id': job.id, 'title': job.title, 'description': job.description} for job in jobs]
        return JsonResponse(jobs_list, safe=False, status=200)

    def put(self, request, job_id):
        try:
            job_data = json.loads(request.body)
            job = get_object_or_404(Job, id=job_id)
            job.title = job_data.get('title', job.title)
            job.description = job_data.get('description', job.description)
            job.save()
            return JsonResponse({'message': 'Job updated successfully', 'job_id': job.id}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def delete(self, request, job_id):
        try:
            job = get_object_or_404(Job, id=job_id)
            job.delete()
            return JsonResponse({'message': 'Job deleted successfully'}, status=204)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)
