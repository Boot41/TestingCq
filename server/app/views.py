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

    def get(self, request, employer_id=None, job_id=None):
        try:
            if job_id:
                job = get_object_or_404(Job, id=job_id)
                job_detail = {'id': job.id, 'title': job.title, 'description': job.description, 'created_at': job.created_at}
                return JsonResponse(job_detail, status=200)

            filters = {}
            if 'title' in request.GET:
                filters['title__icontains'] = request.GET['title']
            if 'location' in request.GET:
                filters['location__icontains'] = request.GET['location']
            if 'type' in request.GET:
                filters['type'] = request.GET['type']
            if 'posted_date' in request.GET:
                filters['created_at__date'] = request.GET['posted_date']

            if employer_id:
                filters['employer_id'] = employer_id

            jobs = Job.objects.filter(**filters)
            jobs_list = [{'id': job.id, 'title': job.title, 'description': job.description, 'created_at': job.created_at} for job in jobs]
            return JsonResponse(jobs_list, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

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