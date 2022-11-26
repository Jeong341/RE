#include<bits/stdc++.h>
using namespace std;
bool cmp(long long int x,long long int y)
{
	return x>y;
}
int main()
{
	long long int sumtime=0,n,t,i,j,k=0;
	long long int *a;
	cin>>n>>t;
	a=new long long int[n+1];
	for(i=0;i<n;i++)
	{
		cin>>a[i];
	}
	sort(a,a+n,cmp);
	if(n%2==0)
	{
		for(i=0;i<=n-3;i+=2)
		{
			sumtime+=a[i];
			k++;
		}
		sumtime+=k*(2*a[n-2]+a[n-1])+a[n-2];
	}
	else
	{
		for(i=0;i<=n-4;i+=2)
		{
			sumtime+=a[i];
			k++;
		}
		sumtime+=k*(2*a[n-2]+a[n-1])+a[n-2];
		sumtime+=a[n-1]+a[n-2]+a[n-3];
	}
	if(sumtime<=t)cout<<"Yes";
	else cout<<"No"; 
	return 0;
}
