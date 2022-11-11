#include<stdio.h>
long long int partion(long long int a[],long long int l,long long int r)
{
	long long int i=l-1;
	long long int j=r;
	long long int n;
	long long int v=a[r];
	for(;;)
	{
		while(a[++i]<v);
		while(a[--j]>v)if(j==l)break;
		if(j<=i)break;
		n=a[i];
		a[i]=a[j];
		a[j]=n;
	}
	n=a[i];
	a[i]=a[r];
	a[r]=n;
	return i;
}
void quicksort(long long int a[],long long int l,long long int r)
{
	if(r<=l)
	return;
	long long int i;
	i=partion(a,l,r);
	quicksort(a,l,i-1);
	quicksort(a,i+1,r);
}
int main()
{
	long long int a[100002];
	long long int n,i,j,k;
	scanf("%lld",&n);
	for(i=0;i<n;i++)
	{
		scanf("%lld",&a[i]);
	}
	quicksort(a,0,n-1);
	printf("%lld",a[0]);
	for(i=1;i<n;i++)
	{
		printf(" %lld",a[i]);
	}
	return 0;
}
