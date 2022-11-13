#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
struct node
{
	string name;
	int x;
};
struct Heap
{
	int Maxsize;
	int last;
	struct node *h;
};
struct Heap* CreatHeap(int Size)
{
	struct Heap *h;
	h=(struct Heap*)malloc(sizeof(*h)); 
	h->Maxsize=Size+1;
	h->last=0;
	h->h=(struct node*)malloc(h->Maxsize*sizeof(struct node));
	return h;
}
void Move(struct node a[],int i,int n)
{
	int j,k;
	 for(j=n-1;j>=i;j--)
	 {
	 	a[j+1]=a[j];
	 }
	 }  
void Put(struct Heap *H,string a,int k)
{
	int temp,flag=0;
	if(H->last==0)
	{
		H->last++;
		H->h[H->last].x=k;
		H->h[H->last].name=a;
	}
	else
	{
		temp=H->last;
		 H->last++;
		while(temp)
		{
			if(H->h[temp].x>k)
			{
				Move(H->h,temp+1,H->last);
				H->h[temp+1].x=k;
				H->h[temp+1].name=a;
				flag=1;
				break;
			}
			temp--;
		}
		if(flag==0)
		{
			Move(H->h,temp+1,H->last);
			H->h[temp+1].x=k;
			H->h[temp+1].name=a;
		}
	}
}
void Get(struct Heap *H)
{
	if(H->last==0)
	{
		cout<<"EMPTY QUEUE!"<<endl;
	}
	else
	{
		cout<<H->h[H->last].name<<endl;
		H->last--;
	} 
}
int main()
{
	int n,i,j,k;
	string temp,a;
	cin>>n;
	struct Heap *h;
	h=CreatHeap(n);
	for(i=0;i<n;i++)
	{
		cin>>temp;
		if(temp[0]=='P')
		{
			cin>>a>>k;
				Put(h,a,k);
		}
		else
		{
			Get(h);
		}		
	}
	return 0;
	}

