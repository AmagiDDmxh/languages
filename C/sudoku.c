#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define N 9
#define DIVIDER "---------------------------------"

int animationTime = 133;

void printSudoku(int arr[N][N])
{
  printf(DIVIDER);
  printf("\n");
  for (int i = 0; i < N; i++)
  {
    for (int j = 0; j < N; j++)
    {
      if (j % 3 == 0)
        printf("|");
      printf(" %d ", arr[i][j]);
      if (j % 3 == 2 || j == 8)
        printf("|");
    }
    printf("\n");
    if (i % 3 == 2)
      printf(DIVIDER);
    printf("\n");
  }
}

char isSafe(int grid[N][N], int row, int col, int num)
{
  for (int i = 0; i < N; i++)
    if (grid[row][i] == num || grid[i][col] == num)
      return 0;

  int startCol = col - col % 3,
      startRow = row - row % 3;

  for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
      if (grid[startRow + i][startCol + j] == num)
        return 0;

  return 1;
}

char sodukuSolver(int grid[N][N], int row, int col)
{
  if (row == N - 1 && col == N)
    return 1;

  if (col == N)
  {
    row++;
    col = 0;
  }

  if (grid[row][col] > 0)
    return sodukuSolver(grid, row, col + 1);

  for (int num = 1; num <= N; num++)
  {
    if (isSafe(grid, row, col, num))
    {
      system("clear");
      // fflush(stdout);
      grid[row][col] = num;
      printSudoku(grid);

      usleep(animationTime * 1000);
      if (sodukuSolver(grid, row, col + 1))
        return 1;
    }
    grid[row][col] = 0;
  }

  return 0;
}

char solveSudoku(int grid[N][N])
{
  return sodukuSolver(grid, 0, 0);
}

int main(int argc, string argv[])
{
  if (argc == 2) {
    int time = atoi(argv[1]);
    printf("Change animation time to %d milliseconds", time);
    animationTime = atoi(argv[1]);
    sleep(3);
  }

  int grid[N][N] = {{3, 0, 6, 5, 0, 8, 4, 0, 0},
                    {5, 2, 0, 0, 0, 0, 0, 0, 0},
                    {0, 8, 7, 0, 0, 0, 0, 3, 1},
                    {0, 0, 3, 0, 1, 0, 0, 8, 0},
                    {9, 0, 0, 8, 6, 3, 0, 0, 5},
                    {0, 5, 0, 0, 9, 0, 6, 0, 0},
                    {1, 3, 0, 0, 0, 0, 2, 5, 0},
                    {0, 0, 0, 0, 0, 0, 0, 7, 4},
                    {0, 0, 5, 2, 0, 6, 3, 0, 0}};

  // printf("put 1 in {0, 0} isSafe? %d\n", isSafe(grid, 0, 0, 1));

  printSudoku(grid);

  solveSudoku(grid);

  return 0;
}