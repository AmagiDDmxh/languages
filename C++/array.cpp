#include <iostream>
#include <array>
#include <string>
using namespace std;


const int Seasons = 4;
const string Snames[Seasons] = {"Spring", "Summer", "Fall", "Winter"};

void fill(double pa[Seasons]);
void show(double da[Seasons]);

int main()
{
  double expenses[Seasons];

  fill(expenses);
  show(expenses);

  return 0;
}

void fill(double pa[Seasons])
{
  for (int i = 0; i < Seasons; i++)
  {
    cout << "Enter " << Snames[i] << " eexpenses: ";
    cin >> pa[i];
  }
}

void show(double da[Seasons])
{
  double total = 0.0;
  cout << "\nEXPENSES\n";
  for (int i = 0; i < Seasons; i++)
  {
    cout << Snames[i] << ": $" << da[i] << endl;
    total += da[i];
  }
  cout << "Total Expenses: $" << total << endl;
}
