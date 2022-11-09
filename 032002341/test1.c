#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct Node *PtrToNode;
struct Node {
    ElementType Data; /* �洢������� */
    PtrToNode   Next; /* ָ����һ������ָ�� */
};
typedef PtrToNode List; /* ���嵥�������� */

List ReadInput(); /* ����ʵ�֣�ϸ�ڲ��� */
void PrintList( List L ); /* ����ʵ�֣�ϸ�ڲ��� */
void K_Reverse( List L, int K );

int main()
{
    List L;
    int K;

    L = ReadInput();
    scanf("%d", &K);
    K_Reverse( L, K );
    PrintList( L );

    return 0;
}

/* ��Ĵ��뽫��Ƕ������ */
void K_Reverse( List L, int K )
{
	List p,q,r,t;
	int sum=0,i,j;
	p=L->Next;
	for(sum=0;p!=NULL;p=p->Next)
	{	
		sum++;
	}
	if(sum<K||K<=1||L->Next==NULL)
	return ;
	p=NULL;
	q=L->Next;
	r=q->Next;
	t=q;
	for(i=1;i<=sum/K;i++)
	{
		for(j=1;j<=K;j++)
		{
			q->Next=p;
			p=q;
			q=r;
			r=r->Next;
		}
		if(i==0)
		{
			L->Next=q;
		}
		else
		{
			t->Next=q;
			t=q;
			while(t->Next!=NULL)
			{
				t=t->Next;
			}
		}
		if(i!=sum/K)
		{
			p=NULL;
			q=r;
			r=r->Next;
		}

	}
	t->Next=r;
	return ;
}
