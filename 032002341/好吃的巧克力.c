#include<stdio.h>
struct r
{
	int number;
	int quyu;
};
int main()
{
	int n,m,i,j,k,p;
	int sort[2500]={0};
	int a[1100000];
	struct r result[1000];
	scanf("%d%d",&n,&m);
	for(i=1;i<=n;i++)
	{
		scanf("%d",&a[i]);
	}
	for(i=1;i<=n-m+1;i++)
	{
		k=m;
		for(j=1;j<=m;j++)
		{
			sort[j]=0;
		}
			for(j=1;j<=n;j++)
		{
			if(sort[a[j]]==0)
			{
				sort[a[j]]++;
				k--;
			}
			if(k==0)
			{
				break;
			}
		}
		if(k==0)
		{
			result[i].number=i;
			result[i].quyu=j-i;
		}
		
		else
		break;
		
	}
	for(j=1;j<=i-2;j++)
	{
		for(p=j;p<=i-2;p++)
		{
			if(result[p].quyu>result[p+1].quyu)
			{
				result[900]=result[p];
				result[p]=result[p+1];
				result[p+1]=result[900];
			}
		}
	 }
	 printf("%d %d",result[1].number,result[1].quyu+result[1].number); 
	return 0;
	
 } 
