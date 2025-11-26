#include <iostream>
using namespace std;

// Function to check if a digit is prime
bool isPrime(int n) {
    if (n < 2)
        return false;
    if (n == 2 || n == 3)
        return true;
    if (n % 2 == 0 || n % 3 == 0)
        return false;
    return true;
}

int main() {

    string studentID = "BC240403190"; 
    string studentName = "ZAIN ALI";

    cout << studentID << " belongs to " << studentName << endl;

    int zeros = 0, evens = 0, odds = 0, primes = 0;

    for (int i = 0; i < studentID.length(); i++) {
        char ch = studentID[i];
        int digit = ch - '0';

        if (digit == 0) {
            cout << digit << " zero found in id" << endl;
            zeros++;
        }
        else if (isPrime(digit)) {
            cout << digit << " is a prime number" << endl;
            primes++;
        }
        else if (digit % 2 == 0) {
            cout << digit << " is an even number" << endl;
            evens++;
        }
        else {
            cout << digit << " is an odd number" << endl;
            odds++;
        }
    }

    cout << endl << "Total Counts:" << endl;
    cout << "Zeros: " << zeros << endl;
    cout << "Even numbers: " << evens << endl;
    cout << "Odd numbers: " << odds << endl;
    cout << "Prime numbers: " << primes << endl;

    return 0;
}
