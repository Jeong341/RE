#include<iostream>
#include<string>
using namespace std;
int main()
{
	int n,i,j,k,temp;
	string a[110];
	cin>>n>>k;
	for(i=0;i<n;i++)
	{
		cin>>a[i];
	}
	for(i=0;i<k;i++)
	{
		for(j=i+1;j<n;j++)
		{
			if(a[j]<a[j-1])
			{
				a[101]=a[j];
				a[j]=a[j-1];
				a[j-1]=a[101];
			}
		}
	}
	for(i=0;i<n;i++)
	{
		cout<<a[i]<<endl;
	}
	return 0;
}
