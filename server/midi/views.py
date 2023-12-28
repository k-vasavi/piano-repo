import matplotlib.pyplot as plt
import mido
from rest_framework.views import APIView
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST)
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.exceptions import ParseError
import os
import tempfile
from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import (HttpResponseBadRequest, HttpResponseNotFound,
                                  HttpResponseServerError)

import logging
log = logging.getLogger(__name__)


# Create your views here.


def midi(request):
    return HttpResponse("Hello world!")


class FetchView(APIView):
    def post(self, request):
        try:
            first_file = request.data.get('input')
            second_file = request.data.get('output')

            # Check if both files are provided
            if not first_file or not second_file:
                return Response({"error": "Both 'input' and 'output' files are required."}, status=HTTP_400_BAD_REQUEST)

            # Save uploaded files to temporary locations
            first_file_path = self.save_uploaded_file(first_file)
            second_file_path = self.save_uploaded_file(second_file)

            pitches1, pitches2, differences = self.compare_midi_files(first_file_path, second_file_path)

            # Convert Message objects to a serializable format
            # { channel: 0, note: 67, velocity: 100, time: 0 },

            differences_serializable = [{"channel": msg.channel,"note": msg.note,"velocity": msg.velocity,"time":msg.time} for msg in differences]
            pitches1_serializable = [{"channel": msg.channel,"note": msg.note,"velocity": msg.velocity,"time":msg.time} for msg in pitches1]
            pitches2_serializable = [{"channel": msg.channel,"note": msg.note,"velocity": msg.velocity,"time":msg.time} for msg in pitches2]

            return Response({"difference":differences_serializable,"pitches1":pitches1_serializable,"pitches2":pitches2_serializable}, status=HTTP_200_OK)

        except Exception as e:
            log.exception(e)
            return Response({"error": "Internal server error"}, status=HTTP_400_BAD_REQUEST)
        finally:
            # Delete temporary files after processing
            if first_file_path and os.path.exists(first_file_path):
                os.remove(first_file_path)
            if second_file_path and os.path.exists(second_file_path):
                os.remove(second_file_path)

    def save_uploaded_file(self, uploaded_file):
        """Save the uploaded file to a temporary location and return the file path."""
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        with open(temp_file.name, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
        return temp_file.name

    def compare_midi_files(self, midi_file1, midi_file2):
        """Compares two MIDI files and returns a list of Message objects indicating differences."""
        pitches1 = self.midi_to_pitch_sequence(midi_file1)
        pitches2 = self.midi_to_pitch_sequence(midi_file2)
        print(pitches2,"&&&&&&&&&&&&&&&&&&&&&&7")

        # Assume files are of equal length for simplicity
        differences = [msg1 for msg1, msg2 in zip(pitches1, pitches2) if msg1 != msg2]

        return pitches1, pitches2, differences

    def midi_to_pitch_sequence(self, midi_file):
        """Converts a MIDI file to a list of Message objects."""
        midi = mido.MidiFile(midi_file)
        pitches = []

        for msg in midi:
            if msg.type == 'note_on':
                pitches.append(msg)

        return pitches




   
