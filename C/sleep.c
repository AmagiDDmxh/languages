/* loading program */

#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

#define TIMELIMIT 5

int main()
{
    for(int i = 0, j; i < TIMELIMIT; ++i) {
        j = i;
        printf("Loading: %i%%", ++j);
        printf("\r");
        fflush(stdout);
        sleep(1);
    }
    return(0);
}
