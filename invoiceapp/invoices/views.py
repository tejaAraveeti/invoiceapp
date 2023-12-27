# Importing necessary modules
from .data import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# Your APIView classes remain the same
class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data
            print("User details:", user)
            token = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access_token": str(token.access_token),
                "refresh_token": str(token)
            })
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=401)

class InvoiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data  # reading the data
        data["user"] = request.user.id
        serializer = InvoicesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Invoice added successfully"}, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request):
        invoices = Invoices.objects.filter(user=request.user.id)
        serializer = InvoicesSerializer(invoices, many=True)  # dictionary format
        return Response(serializer.data)  # Return serializer.data instead of serializer

class SpecificInvoice(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        invoice = Invoices.objects.get(invoice_id=id, user=request.user.id)
        serializer = InvoicesSerializer(invoice).data
        return Response(serializer)

class AddItems(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        data = request.data
        data["invoices"] = id
        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)