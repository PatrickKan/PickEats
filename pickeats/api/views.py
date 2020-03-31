from rest_framework import viewsets, permissions

from .serializers import TodoSerializer
# from todos.models import Todo
from yelp.client import Client
from pickeatscrud.settings import YELP_API_KEY
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import argparse
import json
import pprint
import sys
import urllib

from urllib.error import HTTPError
from urllib.parse import quote
from urllib.parse import urlencode

client = Client(YELP_API_KEY)
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
URL_PARAMS = {
'term': 'boba',
'longitude': 0,
'latitude': 0
}

def get_request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response

class TodoViewSet(viewsets.ModelViewSet):
    # queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class YelpDataList(APIView):
    def get(self, request, format=None):
        return HttpResponse(get_request(API_HOST, SEARCH_PATH, YELP_API_KEY, URL_PARAMS), content_type='application/json')