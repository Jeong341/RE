#include<bits/stdc++.h>
using namespace std;
int main() 
{
	int n,i,j,k,m,l,r,cnt;
	int *set,*mark;
	while(1)
	{
		cin>>n;
		if(n==0)
		{
			return 0;
		}
		cin>>m;
		cnt=0;
		set=new int[n+1];
		mark=new int[n+1];
		for(i=1;i<=n;i++)
		{
			set[i]=i;
			mark[i]=0;
		}
		for(i=0;i<m;i++)
		{
			cin>>l>>r;
			if(set[l]!=set[r])
			{
				k=set[r];
				for(j=1;j<=n;j++)
				{
					if(set[j]==k)
					{
						set[j]=set[l];
					}
				}
			}
		
		}
		for(i=1;i<=n;i++)
		{
			if(mark[set[i]]==0)
			{
				cnt++;
				mark[set[i]]=1;
			}
		}
		cout<<cnt-1<<endl;
	}

}
