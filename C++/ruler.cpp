#include <iostream>
using namespace std;
const int power = 7;
const int len = pow(2, power) + 2;
void subdivide(char ar[], int low, int high, int level);
int main()
{
  char ruler[len];
  int i;
  for (i = 1; i < len - 2; i++)
  {
    ruler[i] = ' ';
  }
  ruler[len - 1] = '\0';
  int max = len - 2;
  int min = 0;
  ruler[min] = ruler[max] = '|';
  cout << ruler << endl;
  for (i = 1; i <= power; i++)
  {
    subdivide(ruler, min, max, i);
    cout << ruler << endl;
    for (int j = 1; j < len - 2; j++)
    {
      ruler[j] = 'a';
    }
  }
  return 0;
}
void subdivide(char ar[], int low, int high, int level)
{
  if (level == 0)
  {
    return;
  }
  int mid = (high + low) >> 1;
  ar[mid] = '|';
  subdivide(ar, low, mid, level - 1);
  subdivide(ar, mid, high, level - 1);
}