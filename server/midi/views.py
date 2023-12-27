from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import (HttpResponseBadRequest, HttpResponseNotFound,
                                  HttpResponseServerError)

import logging
log = logging.getLogger(__name__)

from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_204_NO_CONTENT,HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView

# Create your views here.

def midi(request):
    return HttpResponse("Hello world!")

class FetchView(APIView):
    def post(self, request):
        try:
            print(request,"requesttt")
            return Response(True, status=HTTP_200_OK)
        except Exception as e:
            print("Error",e)
            log.exception(e)
            return HttpResponseNotFound()